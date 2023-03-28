import Veggie from "../components/Veggies";
import Popular from "../components/Popular";
import {motion} from "framer-motion";

function Home() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opcacity: 0 }}
      exit={{ opcacity: 0 }}
      transition={{ duration: 0.5 }}
    >
        <Veggie />
        <Popular />
    </motion.div>
  )
}

export default Home