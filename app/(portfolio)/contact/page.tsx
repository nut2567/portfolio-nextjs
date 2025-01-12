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
    <div className="min-h-[1500px]  flex justify-center w-full ">
      <Repositories>
        <div className="relative w-full px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold text-blue-500 mb-6 text-center">
            Socials
          </h2>
          <ul className="list-none space-y-4">
            {socials.map((social, index) => (
              <li key={index} className="flex flex-col sm:flex-row sm:items-center text-sm sm:text-base">
                <span className="font-semibold mr-1">{social.name} : </span>
                <a
                  className="text-blue-500 underline break-all"
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Repositories>
    </div>
  )
}
