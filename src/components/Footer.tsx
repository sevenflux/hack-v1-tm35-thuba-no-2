import { IconButton } from "@radix-ui/themes";
import { DiscordIcon, GithubIcon, TelegramIcon } from "./Icons";
import Link from "next/link";

function Footer() {
  return (
    <footer className={`bg-[#110e18] border-t border-[#3a3469] py-12 md:py-10 lg:py-16 flex flex-col`}>
      <div className={`container px-4 md:px-6 mx-auto w-full`}>
        <div className={`flex justify-between items-center border-b border-[#3a3469] pb-4`}>
          <div className={`flex items-center gap-2 mb-4 md:mb-0`}>
            <div className={
              `h-8 w-8 rounded-xl bg-gradient-to-tr from-[#9b87f5]
               to-[#0ea5e9] flex items-center justify-center`
            }>
              <div className={
                `h-5 w-5 rounded-md bg-[#110e18] flex items-center justify-center
                 text-white font-bold text-xs`
              }>
                A
              </div>
            </div>
            <span className={
              `text-2xl font-bold tracking-tight bg-clip-text bg-gradient-to-tr from-[#9b87f5] 
               to-[#0ea5e9] text-transparent`
            }>
              AGENT
            </span>
          </div>
          <div className={`flex flex-row space-x-3`}>
            <div className={`flex space-x-3 h-12 w-12 rounded-full hover:bg-[#7360ca] items-center justify-center`}>
              <Link href="https://github.com/z2htech">
                <IconButton className={`cursor-pointer flex`}>
                  <GithubIcon className={`h-5 w-5 fill-white`} />
                  <span className="sr-only">Github</span>
                </IconButton>
              </Link>
            </div>
            <div className={`flex space-x-3 h-12 w-12 rounded-full hover:bg-[#7360ca] items-center justify-center`}>
              <Link href="https://discord.com">
                <IconButton className={`cursor-pointer flex`}>
                  <DiscordIcon className={`h-5 w-5 fill-white`} />
                  <span className="sr-only">Discord</span>
                </IconButton>
              </Link>
            </div>
            <div className={`flex space-x-3 h-12 w-12 rounded-full hover:bg-[#7360ca] items-center justify-center`}>
              <Link href="https://github.com/z2tch">
                <IconButton className={`cursor-pointer flex`}>
                  <TelegramIcon className={`h-5 w-5 fill-white`} />
                  <span className="sr-only">Telegram</span>
                </IconButton>
              </Link>
            </div>
          </div>
        </div>
        <div className={`mt-2 pt-2 flex flex-row md:flex-row justify-between items-center`}>
          <p className={`text-sm text-[#99a1af]`}>
            © {new Date().getFullYear()} AGENT. All rights reserved.
          </p>
          <div className={`flex flex-wrap gap-4 text-sm text-[#99a1af]`}>
            <a href="#" className={`hover:text-white`}>
              Team
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;