export default function Register(){
    return (
        <>
            <h1 className="title">Register</h1>


            <form className="w-1/2 mx-auto space-y-6">
                <div>
                    <input type="text" className="input" placeholder="Name" />
                </div>
                <div>
                    <input type="text" className="input" placeholder="Email" />
                </div>
                <div>
                    <input type="password" className="input" placeholder="Password" />
                </div>
                <div>
                    <input type="password" className="input" placeholder="Confirm Password" />
                </div>

                <button className="btn btn-primary">Register</button>
                
            </form>

        </>
    );
}