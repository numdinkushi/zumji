/* eslint-disable @next/next/no-img-element */
     
        import {
          Page,
          Navbar,
          Block,
          Button,
          List,
          ListItem,
          
          BlockTitle,
          Preloader,
          Chip,
        } from 'konsta/react';
import Layout from './Layout';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { ZUMJI_ABI, ZUMJI_CONTRACT } from '@/utils/contracts';
import { writeContract, readContract,waitForTransaction } from "@wagmi/core";

        
        export default function Home() {
          const { address } = useAccount();

          const [isOnboarded, setIsOnboarded] = useState(false);

          const handleOnboard = async() => {
            try {
              console.log("ONBOARDING")
              getIsOnboarded()
          

              const tx = await writeContract({
                address: ZUMJI_CONTRACT,
                abi: ZUMJI_ABI,
                functionName: "onboard",
                args: [],
              });
              const hash  = await waitForTransaction(tx);

              if (hash) {
                console.log("ONBOARDING")
                getIsOnboarded();
              }
              
              
              
              

              
            } catch (error) {
              
            }
          }

          const getIsOnboarded = async() => {
            console.log(address)
            try {
              console.log(address)
              const isOnboarded: any = await readContract({
                address: ZUMJI_CONTRACT,
                abi: ZUMJI_ABI,
                functionName: "isUserOnboarded",
                args: [address],
              });

              console.log("ISONB: ",isOnboarded);

              setIsOnboarded(isOnboarded);
            } catch (error) {
              console.log("ISONB: ",error);
            }
          }
          useEffect(() => {
            getIsOnboarded()
          } ,[ address ])

       

          return (
            <Layout>
      <Navbar title="Zumji"  colors={{
        bgIos: 'bg-black',
        bgMaterial: 'bg-black',
        textIos: 'text-white',
        textMaterial: 'text-white',
      }} />

      <div className="h-full">
          
          <section className="bg-gradient-to-b from-yellow-700/[4.79] via-yellow-800 h-full">
            <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-12">
              <a
                href="https://celo.org"
                target="_blank"
                className="inline-flex items-center justify-between px-1 py-1 pr-4 text-sm  rounded-full mb-7 bg-gray-800 text-white hover:bg-gray-200 hover:bg-gray-700"
                role="alert"
              >
                <Chip
                  media={
                    <img
                      alt="celo"
                      className="ios:h-7 material:h-6 rounded-full"
                      src="/celo.png"
                    />
                  }
                  className="text-xs bg-black rounded-full text-white px-4 py-1.5 mr-3"
                ></Chip>{" "}
                <span className="text-sm font-medium ml-2">Powered by Celo</span>
                <svg
                  className="w-5 h-5 ml-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
              <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight *:md:text-5xl lg:text-6xl text-white">
              Transform Your Business with Zumji: Loyalty, Rewards, and More
              </h1>
              <p className="mb-8 text-lg font-normal text-white lg:text-xl sm:px-16 xl:px-48 ">
              Empowering SMEs with Staking, Borrowing, and Innovative Rewards on Celo 
              </p>
              <div className="flex mb-8 align-center justify-center space-x-4 lg:mb-16 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                
                {isOnboarded ? (

<Link
className=" mt-6 max-w-md w-3/3 inline-flex justify-center items-center gap-x-1 text-center bg-gray-600 shadow-2xl shadow-transparent hover:shadow-black-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-6 dark:focus:ring-offset-gray-800 mx-5"
href="/finance"
>
Zumji Stats
<svg
  className="w-2.5 h-2.5"
  width="16"
  height="16"
  viewBox="0 0 16 16"
  fill="none"
>
  <path
    d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  />
</svg>
</Link>

                ): (
                  <span
                  className=" mt-6 max-w-md cursor-pointer w-3/3 inline-flex justify-center items-center gap-x-1 text-center bg-gray-600 shadow-2xl shadow-transparent hover:shadow-black-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-6 dark:focus:ring-offset-gray-800 mx-5"
                  onClick={handleOnboard}
                >
                  Join Zumji
                  <svg
                    className="w-2.5 h-2.5"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                )}
                 
              </div>
            </div>
          </section>

      
        </div>
    </Layout>
          );
        }
        
        