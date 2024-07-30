import SignUpEmail from "@/components/SignUpWithEmail";
import SignUpPhone from "@/components/SignUpWithPhone";
import * as React from "react";

export default function SignUpScreen() {
    const [alternate, setAlternate] = React.useState(false);
    return (
        <>
            {!alternate && (<SignUpEmail onPress={() => setAlternate(true)} />)}
            {alternate && (<SignUpPhone onPress={() => setAlternate(false)} />)}
        </>
    );
}
