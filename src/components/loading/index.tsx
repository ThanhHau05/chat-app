import styles from "../../styles/globals.module.scss";

export const SimpleLoading = () => {
  return (
    <div className="fixed z-50 w-full h-screen bg-slate-400/70">
      <div className="flex flex-col items-center justify-center h-full">
        <span className={styles.loader}></span>
      </div>
    </div>
  );
};
