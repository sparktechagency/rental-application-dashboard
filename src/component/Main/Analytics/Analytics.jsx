import Charts2 from "../Dashboard/Charts2"
import Charts from "../Dashboard/Charts"
import Status from "../Dashboard/Status"


const Analytics = () => {
  return (
    <div className="w-full px-5 min-h-screen py-10 space-y-5 bg-[#F5F5F5]">
    <Status />
    <Charts/>
    <Charts2 />
    </div>

  )
}

export default Analytics