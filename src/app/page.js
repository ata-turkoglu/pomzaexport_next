import IntroVideo from "../components/introVideo";
import FacilitiesLinks from "../components/facilitiesLinks";
import Brands from "../components/brands";
import Sustainability from "../components/sustainability";

function Home() {
    console.log();
    return (
        <div className="flex flex-col h-fit md:min-w-full md:min-h-max">
            <IntroVideo />
            <FacilitiesLinks />
            <Sustainability />
            <Brands />
        </div>
    );
}

export default Home;
