import type { ReactNode } from "react";
import styles from "./Profile.module.css";

type ProfileProps = {
  img: string;
  alt?: string;
  nome: string;
  cargo?: string;
  children: ReactNode;
};

function Profile({ img, alt, nome, cargo, children }: ProfileProps) {
  return (
    <div className={styles.profile}>
      <div className={styles.imageContainer}>
        <img src={img} alt={alt} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.nome}>{nome}</h3>
        {cargo && <p className={styles.cargo}>{cargo}</p>}
        <div className={styles.social}>{children}</div>
      </div>
    </div>
  );
}
export default Profile;
