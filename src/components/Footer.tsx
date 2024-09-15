export const Footer = () => {
  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div className="col-span-full xl:col-span-2">
          <a
            rel="noreferrer noopener"
            href="/"
            className="font-bold text-xl flex items-center"
          >
            <span className="font-amsterdam text-2xl ml-2">Lokendar Singh Rathore</span>
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Contact</h3>
          <div>
            <a
              href="mailto:rathodlokendar@gmail.com"
              className="opacity-60 hover:opacity-100"
            >
              Email
            </a>
          </div>
          <div className="opacity-60">
            Mumbai, MH
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Social</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="https://github.com/rathodloki"
              className="opacity-60 hover:opacity-100"
            >
              GitHub
            </a>
          </div>
          <div>
            <a
              rel="noreferrer noopener"
              href="https://www.linkedin.com/in/lokendar-singh/"
              className="opacity-60 hover:opacity-100"
            >
              LinkedIn
            </a>
          </div>
          <div>
            <a
              rel="noreferrer noopener"
              href="https://x.com/rathodloki"
              className="opacity-60 hover:opacity-100"
            >
              Twitter
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Portfolio</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="#skills"
              className="opacity-60 hover:opacity-100"
            >
              Projects
            </a>
          </div>
          <div>
            <a
              rel="noreferrer noopener"
              href="#about"
              className="opacity-60 hover:opacity-100"
            >
              About
            </a>
          </div>
          <div>
            <a
              rel="noreferrer noopener"
              href="#recommend"
              className="opacity-60 hover:opacity-100"
            >
              testimonial
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Support</h3>
          <div>
            <a
              href="https://buymeacoffee.com/rathodloki"
              className="opacity-60 hover:opacity-100"
            >
              Buy me a coffee
            </a>
          </div>
        </div>
      </section>

      <section className="container pb-14 text-center">
        <h3>
          &copy; {new Date().getFullYear()} Portfolio by <span >Lokendar Singh Rathore</span>
        </h3>
        <p className="mt-2 text-sm opacity-60">I hope you like my Portfolio. 😊</p>
      </section>
    </footer>
  );
};