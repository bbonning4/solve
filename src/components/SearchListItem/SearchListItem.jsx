export default function SearchListItem({ image, text, updatedAt }) {
    return (
      <div className="flex justify-between">
        {image ? <img src={image}></img> :
        <p>[No Image]</p>
        }
        <p className="text-left">{text}</p>
        <h1 className="text-right">{updatedAt}</h1>
      </div>
    );
  }