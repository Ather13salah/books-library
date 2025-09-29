import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
function BackArrow({goTo}) {
  return (
    <div className="fixed top-4 left-4">
      <Link href={goTo}>
        <FontAwesomeIcon icon={faArrowLeftLong}></FontAwesomeIcon>
      </Link>
    </div>
  );
}

export default BackArrow;
