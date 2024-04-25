import {
  Roboto,
  Azeret_Mono,
  Inter,
  Noto_Serif,
  Arimo,
  Merriweather,
} from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const mono = Azeret_Mono({ subsets: ["latin"] });
const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });
const serif = Noto_Serif({ subsets: ["latin"] });
const arial = Arimo({ subsets: ["latin"], variable: "--font-arial" });
const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
});

export { inter, mono, roboto, serif, arial, merriweather };
