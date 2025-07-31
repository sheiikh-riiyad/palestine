"use client"
import Footer from "../page/footer";

export default function Policy(){

    return (
    <>
     
         <main className="max-w-3xl mx-auto p-6 text-gray-800">
      <h1 className="text-4xl font-bold text-center text-red-600 mb-8">Donation Policy</h1>

      <p className="text-sm text-gray-500 text-right mb-6">Last Updated: July 30, 2025</p>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-red-500">1. Purpose of Donations</h2>
          <p>
            All funds collected through this platform are used to support humanitarian aid,
            medical assistance, food supplies, and essential services for the affected people of
            Palestine. We aim to be transparent and responsible in using the donations received.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-red-500">2. Accepted Payment Methods</h2>
          
            We currently accept donations through:
            <ul className="list-disc ml-6 mt-2">
              <li><strong>Bangladesh</strong>: bKash, Nagad, Bank Transfer</li>
              <li><strong>International</strong>: Binance (USDT - TRC20)</li>
            </ul>
          
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-red-500">3. Currency and Conversion</h2>
          <p>
            Donations are accepted in <strong>৳ BDT</strong> or <strong>$ USDT</strong>. Exchange rates are not handled
            by our system; they depend on your chosen payment provider.
            
              
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-red-500">4. Refund Policy</h2>
          <p>
            Due to the nature of donations and their immediate use for relief work,
            <strong> all donations are final and non-refundable</strong>. Please ensure your information is correct before submitting.
          <br/>
          <strong>If you think you made a mistake and you want your donation back, you can contact us to get it back.</strong> 
          
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-red-500">5. Transaction Security</h2>
          <p>
            We do <strong>not store any payment card or sensitive financial data</strong>.
            Payments are processed through external platforms (e.g. bKash, Binance), and we only
            collect basic confirmation data like your name and transaction ID.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-red-500">6. Transparency & Reporting</h2>
          <p>
            We maintain a public donation counter for transparency. For further financial breakdowns,
            or if you need a receipt, please contact us via email.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-red-500">7. Contact Us</h2>
          <p>
            If you have any questions about your donation, please reach out at:
            <br />
            📧 <strong>Email</strong>: riiyad.san1819@gmail.com<br />
            📞 <strong>Phone, whatsapp</strong>: +880-1710666995
          </p>
        </div>

      </section>

      <footer className="text-center text-sm text-gray-500 py-6">
             <Footer/>
      </footer>
    </main>

    </>
    )
}