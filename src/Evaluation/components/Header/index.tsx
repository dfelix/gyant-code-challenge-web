import { useContext, useState } from "react";
import { AuthContext } from "../../../Auth/providers/AuthProvider";

const Header = () => {
  const { signOut, getUser } = useContext(AuthContext);
  const [user, setUser] = useState<any | null>(getUser());

  const signOutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    signOut();
  };

  return (
    <>
      <div className="container header">
        Logged in as: {user ? user.name : "Unknown"} | &nbsp;
        <a href="#" onClick={signOutClick}>
          Log out
        </a>
      </div>
    </>
  );
};

export default Header;
