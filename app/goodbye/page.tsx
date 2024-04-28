import Link from "next/link";

const Goodbye = () => {

  return (
    <div>
      <p>Good Bye</p>
      <p><Link href="/">Log back in</Link></p>
    </div>
  );
}
 
export default Goodbye;