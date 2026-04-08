import Divider from "@/components/Divider";

export default function Footer() {
    return (
        <>
            <footer className="max-w-4xl w-full flex flex-col mx-auto pt-4 pb-2">
                <Divider />
                <p className="text-center font-semibold text-base pt-2">
                    Portfolio Abidi Mohamed - BTS SIO SISR
                </p>
                <p className="text-center font-medium brightness-75 text-base">
                    Derniere mise a jour : Janvier 2026
                </p>
            </footer>
        </>
    );
}
