import LogoExi from '../../assets/img/logo-exi.svg'

const Navbar = () => {
  return (
    <>
      <header>
        <a href="https://exisoft.com.ar" target="_blank" rel="noreferrer">
          <img className="logoExi" src={LogoExi} alt="logoExi" />
        </a>
      </header>
    </>
  )
}

export default Navbar
