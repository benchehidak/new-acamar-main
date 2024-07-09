import UserHeader from "@/components/Header";
import Footer from "@/components/Footer";
export default function BuyPage() {
    return (
        <>
            <UserHeader />
            <div>
                <div
                className="content"
                style={{
                    fontFamily: "Dalek Pinpoint",
                    color: "#fcfcfc",
                    textAlign: "center",
                    fontSize: "2.5rem",
                    
                }}
                >
                First RELEASE 
                </div>
                <div
                className="content"
                style={{
                    fontFamily: "Dalek Pinpoint",
                    color: "#fcfcfc",
                    textAlign: "center",
                    fontSize: "2rem",
                    
                }}
                >
                    Points of sale :
                </div>
                <div className="contactinfo text-slate-200">
                    
                <div className="contactinfo__item">
                    <div>SOUSSE - 52 588 451</div>
                </div>
                <div className="contactinfo__item">
                    <div>SOUSSE - 58 277 626</div>
                </div>
                <div className="contactinfo__item">
                    <div>SOUSSE - 99 617 061</div>
                </div>
                <div className="contactinfo__item">
                    <div>SOUSSE - 93 158 643</div>
                </div>
                <div className="contactinfo__item">
                    <div>SOUSSE - 25 051 727</div>
                </div>

                </div>
            </div>
            <Footer />
        </>
    )
        }