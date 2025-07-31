"use client"

import Footer from "../page/footer";


export default function About() {

    return (
    <>
        <main className="min-h-screen bg-gray-50 text-gray-800 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-4xl font-bold text-red-700 mb-6 text-center">About Me</h1>

        <img className=" " src="https://i.ibb.co/2013K63Q/1745664558281-482251449-1448538372790232-466907292978263830-n.jpg"  />

        <p className="mb-4">
          My name is <strong>Md. Riyad</strong>. I am from <strong>Setabganj, Dinajpur, Bangladesh</strong>. I am 24 years old.
        </p>

        <p className="mb-4">
          I completed my <strong>SSC in 2020</strong> with a focus on Science, and later passed my <strong>HSC in 2022</strong> with a major in Accounting.
        </p>

        <p className="mb-4">
          Currently, I work at a small auto rice mill in my hometown. Alongside this, I have taken the responsibility to manage and operate this donation website dedicated to supporting the people of Palestine.
        </p>

        <p className="mb-4">
          I have seen the tireless efforts of volunteers working to provide aid to Gaza, and I decided to join them in making a difference. Through this platform, I collect donations and ensure they are sent to the people of Gaza to help with essential needs.
        </p>

        <p>
          Your support means a lot. Together, we can make a meaningful impact in the lives of those suffering. Thank you for standing with Palestine.
        </p>


        <p><strong>
            
            CONTACT WITH ME
            
        </strong></p>

        <p> <strong> Email: riiyad.san1819@gmail.com</strong> </p>
        <p> <strong> whatsapp: +8801710666995</strong> </p>
        <a href="https://www.facebook.com/SHEIIKH.RIIYAD"> <strong>FACEBOOK</strong></a>

      </div>

      <footer className="text-center text-sm text-gray-500 py-6">
                   <Footer/>
      </footer>
    </main>

    </>
    )
}