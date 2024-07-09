"use client";
import UserHeader from "@/components/Header";
import Button from "@/components/ui/Button";
import Footer from "@/components/Footer";
export default function BuyPage() {
    return (
        <>
            <UserHeader />
            <div>
                <div class="ticker-wrap">
                    <div class="ticker">
                        <div className="ticker__item"> <span style={{color: "#ff7e03"}} >c</span> haotic harmony </div>
                        <div className="ticker__item"> cold seeps </div>
                        <div className="ticker__item"> whitefeel </div>
                        <div className="ticker__item"> smiley'zz </div>
                        <div className="ticker__item"> newram </div>
                    </div>
                </div>
                
            </div>
            <Footer />
        </>
    )
}