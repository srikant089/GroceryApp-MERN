import Hero from '../components/Hero'
import Category from '../components/Category'
import BestSeller from '../components/BestSeller'
import NewLetter from '../components/NewLetter'

const Home = () => {
  return (
    <div className="mt-10">
      <Hero />
      <Category />
      <BestSeller />
      <NewLetter />
    </div>
  )
}

export default Home