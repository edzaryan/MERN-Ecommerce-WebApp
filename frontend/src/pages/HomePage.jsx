import CategoryList from "../components/CategoryList"
import BannerProduct from "../components/BannerProduct"
import HorizontalCardProduct from "../components/HorizontalCardProduct"
import VerticalCard from "../components/VerticalCard"


const HomePage = () => {
    return (
        <div>
            <CategoryList />
            <BannerProduct />

            <HorizontalCardProduct category="airpode" heading="Top's Airpodes" />
            <HorizontalCardProduct category="earphone" heading="Top's Earphones" />

            <VerticalCard category="mobile" heading="Top's Mobiles" />
            <VerticalCard category="printer" heading="Top's Printers" />
            <VerticalCard category="television" heading="Top's Televisions" />
            <VerticalCard category="camera" heading="Top's Cameras" />
            <VerticalCard category="speaker" heading="Top's Speakers" />
            <VerticalCard category="refrigerator" heading="Top's Refrigerators" />
            <VerticalCard category="processor" heading="Top's Processors" />
            <VerticalCard category="trimmer" heading="Top's Trimmers" />
            <VerticalCard category="watch" heading="Top's Watches" />
            <VerticalCard category="mouse" heading="Top's Mouses" />
        </div>
    )
}


export default HomePage
