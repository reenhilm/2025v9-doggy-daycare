import Image from "next/image";
import splashfooter from '../public/images/splashfooter.png';
import styles from './page.module.css'
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex">
        <div className="flex flex-col m-auto items-center">
          <header>
            <h1 className="text-3xl font-bold max-w-3xs drop-shadow-lg my-15 text-center">
              WELCOME TO DOGGY DAYCARE
            </h1>
          </header>
          <main>
            <Link
              href={`/dogs`}          
              className={`${styles.roundedbutton} rounded-lg shadow-md py-3 px-4`}>
              OUR DOGS
            </Link>
          </main>
          <footer>
            <div className="my-30">
              <Image
                src={splashfooter}
                alt="A Dog Wearing Thug Life Meme Pixel Sunglasses">
              </Image>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}