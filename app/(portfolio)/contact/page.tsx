import Repositories from './repositories'
export default function Socials() {
  const socials = [
    {
      name: 'Portfolio',
      link: 'https://portfolio-nutthawat-nextjs.vercel.app/',
    },
    { name: 'Email', link: 'mailto:nutthawat.wdr@gmail.com' },
    { name: 'GitHub', link: 'https://github.com/nut2567' },
    {
      name: 'LinkedIn',
      link: 'https://linkedin.com/in/nutthawat-witdumrong-a58933277',
    },
    { name: 'Facebook', link: 'https://www.facebook.com/nutthawat.witdumrong' },
    {
      name: 'Jobbkk',
      link: 'https://www.jobbkk.com/resumes/preview_new/3815993',
    },
  ]

  return (
    <div className="min-h-[1500px] -m-6 -ml-[72px] flex justify-center p-0">
      <Repositories>
        <div className="relative">
          <h2 className="text-xl font-bold text-blue-400 mb-4">
            Reach Out Via Socials
          </h2>
          <ul className="list-none space-y-2">
            {socials.map((social, index) => (
              <li key={index} className="flex gap-2">
                <span className="font-semibold">{social.name}:</span>
                <a
                  className="text-blue-300"
                  href={social.link}
                  target="_blank"
                  rel="noopener"
                >
                  {social.link}
                </a>
                <span></span>
              </li>
            ))}
          </ul>
        </div>
      </Repositories>
    </div>
  )
}
