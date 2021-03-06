import styles from './Step2View.module.sass'
import Back from '../public/images/back.svg'
import EthicalBrandLogo from '../public/images/ethical-brand.svg'
import { useContext, useState, useEffect } from 'react'
import CardContext from '../lib/CardContext'
import fleekStorage from '@fleekhq/fleek-storage-js'
import ipfsService from '../lib/ipfs'

const Step2View = () => {
  const {
    setStep,
    daoName,
    setDaoName,
    description,
    setDescription,
    logoHash,
    setLogoHash,
  } = useContext(CardContext)

  const submit = () => {
    setStep(3)
  }
  const back = () => {
    setStep(1)
  }

  // const [logoFile, setLogoFile] = useState('')

  // useEffect(() => {
  //   fleekStorage
  //     .getFileFromHash({
  //       hash: logoHash,
  //     })
  //     .then(logoFile => setLogoFile(encodeURIComponent(logoFile)))
  // }, [logoHash])

  const uploadFile = async file => {
    console.log('file uploading to ipfs')
    const imageHash = await ipfsService.uploadFile(file)
    console.log('file upload done')
    setLogoHash(imageHash)
  }

  return (
    <div className={styles.cardInner}>
      <div className={styles.step2Inner}>
        <div className={styles.textSection}>
          <span className={styles.nameLabel}>DAO Name</span>
          <input
            className={styles.nameInput}
            placeholder="Ethical Brand"
            value={daoName}
            onChange={e => {
              setDaoName(e.target.value)
            }}
          />
          <span className={styles.descriptionLabel}>DAO Description</span>
          <textarea
            className={styles.descriptionInput}
            placeholder="About Ethical Brand"
            value={description}
            onChange={e => {
              setDescription(e.target.value)
            }}
          />
        </div>
        <div className={styles.logoSection}>
          <span className={`${styles.logoLabel} ${styles.label}`}>
            DAO Logo
          </span>
          <div className={styles.logoInput}>
            <div className={styles.logoContainer}>
              <img
                className={styles.logoImg}
                src={`https://ipfs.infura.io/ipfs/${logoHash}`}
              />
            </div>
            <label className={styles.logoUploadButton}>
              Upload new
              <input
                style={{ display: 'none' }}
                type="file"
                onChange={e => {
                  const file = e.target.files[0]
                  uploadFile(file)
                }}
                accept="image/*"
              />
            </label>
          </div>
        </div>
      </div>
      <a className={styles.step2Button} onClick={submit}>
        Next Step
      </a>
      <a className={styles.step2BackButton} onClick={back}>
        <img className={styles.backImg} src={Back} />
        Back
      </a>
    </div>
  )
}

export default Step2View
