import Message from "./message";

export default function History({ history }) {
    return (
        <div>
            {history.map((msg, i) => (
                <Message message={msg.data} key={msg.timeStamp + i} />
            ))}
        </div>
    )
}
