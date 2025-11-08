import ProductsSection from "../components/ProductsSection";
import SideBar from "../components/Sidebar";
import '../index.css'

const MarketPlacePage = () => {
    return(
        <div className="flex">
            <SideBar></SideBar>
            <ProductsSection></ProductsSection>
        </div>
    )
}
export default MarketPlacePage;