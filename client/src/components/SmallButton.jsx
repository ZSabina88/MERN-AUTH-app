import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Button from "./Button";

export default function SmallButton() {
  return (
    <section className="flex__row" >
        <Button
        smallBtn
        icon={<FcGoogle size={20}/>}
        text="Google"
        type="button"
        />
        <Button
        smallBtn
        icon={<FaGithub size={20}/>}
        text="Github"
        type="button"
        />
    </section>
  );
}