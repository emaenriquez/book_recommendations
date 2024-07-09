
import { Link } from 'react-router-dom'

const Profile = () => {
    return (
        <>
          <ul>
            <Link to={"/lecturas"}>Lecturas</Link>
          </ul>
          <ul>
            <Link to={"/meinteresan"}>Lecturas</Link>
          </ul>
        </>
    )
}

export default Profile