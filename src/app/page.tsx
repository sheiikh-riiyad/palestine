'use client';

import { useState, useEffect } from 'react';
import { db } from './lib/firebase';
import { ref, push, onValue } from 'firebase/database';
import Footer from './page/footer';
import { QRCodeSVG } from 'qrcode.react';

type Donation = {
  name: string;
  amount: string;
  currency: 'BDT' | 'USDT';
  country: 'Bangladesh' | 'International';
  method: string;
  txid: string;
  message?: string;
};

type RealNewsItem = {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
};

const DONATION_GOAL_BDT = "1,00,000";
const DONATION_GOAL_USDT = "1,000";
const BINANCE_WALLET = "TVTFSDbnMDmk1tpNUsXYoTRxDXGLpd5bih";

export default function Home() {
  const [form, setForm] = useState<Donation>({
    name: '',
    amount: '',
    currency: 'BDT',
    country: 'Bangladesh',
    method: '',
    txid: '',
    message: '',
  });

  const [totalDonatedBDT, setTotalDonatedBDT] = useState(0);
  const [totalDonatedUSDT, setTotalDonatedUSDT] = useState(0);
  const [realNews, setRealNews] = useState<RealNewsItem[]>([]);
  const [latestVideoId, setLatestVideoId] = useState<string | null>(null);

  useEffect(() => {
    const donationsRef = ref(db, 'donations');
    const unsubscribe = onValue(donationsRef, snapshot => {
      const data = snapshot.val();
      let totalBDT = 0;
      let totalUSDT = 0;

      if (data) {
        Object.values(data).forEach((donation: any) => {
          const amount = Number(donation.amount);
          if (!isNaN(amount)) {
            if (donation.currency === 'USDT') {
              totalUSDT += amount;
            } else {
              totalBDT += amount;
            }
          }
        });
      }

      setTotalDonatedBDT(totalBDT);
      setTotalDonatedUSDT(totalUSDT);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchLatestVideo = async () => {
      try {
        const res = await fetch('/api/gaza-video');
        const data = await res.json();
        if (data.videoId) setLatestVideoId(data.videoId);
      } catch (err) {
        console.error('YouTube fetch error:', err);
      }
    };
    fetchLatestVideo();
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        const data = await response.json();
        setRealNews(data.articles || []);
      } catch (error) {
        console.error('News fetch failed:', error);
      }
    };
    fetchNews();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.amount || !form.method || !form.currency || !form.country) {
      alert('Please fill in all required fields.');
      return;
    }
    if (Number(form.amount) <= 0) {
      alert('Please enter a valid donation amount.');
      return;
    }

    try {
      const donationData = { ...form, amount: Number(form.amount) };
      await push(ref(db, 'donations'), donationData);
      alert('Thank you for your donation!');
      setForm({ name: '', amount: '', currency: 'BDT', country: 'Bangladesh', method: '', txid: '', message: '' });
    } catch (error) {
      console.error('Firebase submission error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const getPaymentOptions = (country: string) => {
    if (country === 'Bangladesh') {
      return [
        { value: 'bkash', label: 'bKash', info: 'Send to 01XXXXXXXXX (Personal)' },
        { value: 'nagad', label: 'Nagad', info: 'Send to 01YYYYYYYYY (Personal)' },
        { value: 'bank', label: 'Bangladesh Bank Account', info: 'Bank Name: xxxxxx\nA/C: xxxxxxxx\nBranch: xxxxxx' }
      ];
    } else {
      return [
        { value: 'binance', label: 'Binance', info: `USDT Wallet: ${BINANCE_WALLET}\nNetwork: TRC20` }
      ];
    }
  };

  const allOptions = getPaymentOptions(form.country);

  return (
    <main className="bg-gray-50 min-h-screen text-gray-800">
      <section className="text-center py-16 bg-red-100 shadow-inner">
        <h1 className="text-5xl font-extrabold text-red-700 mb-4">Support Palestine</h1>
        <p className="text-xl text-gray-700 mb-6">Your donation can save lives and bring hope.</p>
        <a href="#donate" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold">
          Donate Now
        </a>
      </section>

      <section className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg my-12">
        <h3 className="text-xl font-semibold mb-4 text-center text-red-700">Donation Totals</h3>
        <p className="text-center text-gray-700">৳{totalDonatedBDT.toLocaleString()} BDT raised of ৳{DONATION_GOAL_BDT}</p>
        <p className="text-center text-gray-700">${totalDonatedUSDT.toLocaleString()} USDT raised of ${DONATION_GOAL_USDT}</p>
      </section>

      <section id="donate" className="max-w-2xl mx-auto px-6 pb-10">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Payment Instructions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {getPaymentOptions('Bangladesh').map(opt => (
            <div key={opt.value} className="bg-white border p-4 rounded shadow">
              <h4 className="text-lg font-semibold text-red-700 mb-2">{opt.label}</h4>
              <p className="text-sm whitespace-pre-wrap">{opt.info}</p>
            </div>
          ))}
          {getPaymentOptions('International').map(opt => (
            <div key={opt.value} className="bg-white border p-4 rounded shadow">
              <h4 className="text-lg font-semibold text-yellow-700 mb-2">{opt.label}</h4>
              <p className="text-sm whitespace-pre-wrap">{opt.info}</p>
              {opt.value === 'binance' && (
                <div className="mt-4 flex justify-center">
                  <QRCodeSVG value="TVTFSDbnMDmk1tpNUsXYoTRxDXGLpd5bih" size={120} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section  className="py-10 px-6 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-10">Confirm Your Donation</h2>
        <p className='text-center text-red-700'>Do not enter any donation data that you did not provide.</p>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
          <input name="name" type="text" value={form.name} onChange={handleChange} placeholder="Full Name" required className="w-full p-4 border rounded" />
          <input name="amount" type="number" value={form.amount} onChange={handleChange} placeholder="Amount" required className="w-full p-4 border rounded" />
          <select name="currency" value={form.currency} onChange={handleChange} required className="w-full p-4 border rounded">
            <option value="BDT">৳ BDT</option>
            <option value="USDT">USDT ($)</option>
          </select>
          <select name="country" value={form.country} onChange={handleChange} required className="w-full p-4 border rounded">
            <option value="Bangladesh">Bangladesh</option>
            <option value="International">International</option>
          </select>
          <select name="method" value={form.method} onChange={handleChange} required className="w-full p-4 border rounded">
            <option value="">Select Payment Method</option>
            {allOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <input name="txid" type="text" value={form.txid} onChange={handleChange} placeholder="Transaction ID" className="w-full p-4 border rounded" />
          <textarea name="message" value={form.message} onChange={handleChange} placeholder="Optional Message or Prayer" rows={3} className="w-full p-4 border rounded" />
          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-semibold">
            Submit Donation
          </button>
        </form>
      </section>

      <section className="max-w-5xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-10">Latest Palestine News</h2>
        <div className="flex justify-center mb-10">
          {latestVideoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${latestVideoId}`}
              className="w-full max-w-xl aspect-video rounded shadow"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Gaza Update"
            ></iframe>
          ) : (
            <p className="text-gray-500">Loading video...</p>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {realNews.slice(0, 5).map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4 flex flex-col">
              {item.image && <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded" />}
              <div className="flex-grow mt-4">
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-red-700 hover:underline">
                  {item.title}
                </a>
                <p className="text-sm text-gray-600 mt-2">{item.description}</p>
              </div>
              <p className="text-xs text-gray-400 mt-4">{new Date(item.publishedAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center text-sm text-gray-500 py-6">
       <Footer/>
      </footer>
    </main>
  );
}