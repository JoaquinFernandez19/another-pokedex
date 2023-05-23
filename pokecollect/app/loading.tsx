import Image from 'next/image';
import { ImSpinner2 } from 'react-icons/im';

export default function Loading() {
  return (
    <div className="loading-spinner">
      <ImSpinner2 />
      {/* <Image src="/loader.gif" alt="loader" width={100} height={100} /> */}
    </div>
  );
}
