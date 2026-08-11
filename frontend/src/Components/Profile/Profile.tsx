import styles from "./Profile.module.css";
import { ReactNode } from "react";

type ProfileProps = {
  img: string;
  alt?: string;
  nome: string;
  children: ReactNode;
};

function Profile({ img, alt, nome, children }: ProfileProps) {
  return (
    <div className={styles.profile}>
      <div className={styles.imageContainer}>
        <img src={img} alt={alt} />
      </div>
      <div className={styles.info}>
        <h2>{nome}</h2>
        {children}
      </div>
    </div>
  );
}
export default Profile;
