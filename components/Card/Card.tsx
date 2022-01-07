import { useEffect, useState } from "react"
import { AddAvatarAction, GetAvatarAction } from "../../api/bakcend.api"


export default function Card({ id, button, image, title, price, lfg, blur, userAdd }: any) {

    const [name, setName] = useState('')
    const [avatarData, setAvatarData] = useState(undefined)

    useEffect(() => {
        if (userAdd) {
            fetchAvatar()
        }
    }, [userAdd])

    const fetchAvatar = async () => {
        let avat = await GetAvatarAction(userAdd)
        console.log("avater:-=-=", avat)
        if (avat.success && avat.data) {
            setAvatarData(avat.data)
            setName(avat.data.name)
        }
    }

    const onAddName = async () => {
        if (!name) return

        let data = { name, userAddress: userAdd }

        let res = await AddAvatarAction(data)
        fetchAvatar()
        // setName('')
    }
    return (

        <div className="At-Card">
            <div className="At-cardnumberartea">
                <em>{id}</em>
                <div className="At-FCard">
                    <input type="text" placeholder="Add Avatar Name" className="AtCardInput" value={name} onChange={(e) => setName(e.target.value)} />
                    {!avatarData && <button className="At-FCardBtn" onClick={() => onAddName()}>
                        Add
                    </button>}
                </div>
                <span>{button}</span>
            </div>
            <figure className={`At-CardImage ${blur && 'AtBlurImage'}`}>
                <img src={image} alt="card in=mage" />
            </figure>
            {/* <div className="At-Carddetail">
                <h3>{title}</h3>
                <span>{price}</span>
                <h4>{lfg} LFG </h4>
            </div> */}
        </div>
    )
}