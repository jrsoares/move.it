import styles from '../styles/components/Profile.module.css'
import {useContext} from "react";
import {ChallengesContext} from "../contexts/ChallengesContext";

export function Profile() {
    const {level} = useContext(ChallengesContext)
  return(
    <div className={styles.profileContainer}>
      <img src="https://avatars.githubusercontent.com/u/12559921?s=460&u=bd533eaa213c72a8d1403b028ad470e1e2af3297&v=4" alt="Junior Soares"/>
      <div>
        <strong>Junior Soares</strong>
        <p>
          <img src="icons/level.svg" alt="level"/>
          Level {level}
        </p>
      </div>
    </div>
  )
}