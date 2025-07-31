"use clint"

import { useRouter } from "next/navigation";



export default function Footer() {
  
    const router = useRouter();

    return (
    <div>

            <div>
                <button className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold" onClick={()=> router.push(`/`)}  >DONATE</button>
            </div>

<br/>

            <div className="">
                <a onClick={()=> router.push(`/policy/`)} className="mr-10 cursor-pointer text-black" >Policy Notice</a>
                <a onClick={()=> router.push(`/about/`)} className="ml-10 cursor-pointer text-black">About Me</a>
            </div>



<br/>


            <div>
                 &copy; 2025- {new Date().getFullYear()} Donate for Palestine. 
            </div>



    </div>
    )
}