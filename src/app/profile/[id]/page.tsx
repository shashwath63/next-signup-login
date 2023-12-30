export default function userProfile({params}:any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>profile</h1>
      <hr />
      <p>
        Profile page
        <span className="m-2 p-2 rounded bg-white text-black">{params.id}</span>
      </p>
    </div>
  );
}
