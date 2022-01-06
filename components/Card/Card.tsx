

export default function Card({id,button,image,title,price,lfg,blur}:any){
    return(
        
        <div className="At-Card">
            <div className="At-cardnumberartea">
                <em>{id}</em>
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