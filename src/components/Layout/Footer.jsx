import Code from '../../assets/img/code.svg'
const Footer = () => {
  return (
    <footer>
      Developed by
      <a
        href="https://joaquin-vasquez.web.app/cv"
        target="_blank"
        rel="noreferrer"
      >
        Joaquin Vasquez
      </a>
      <img src={Code} alt="Code" />
    </footer>
  )
}

export default Footer
