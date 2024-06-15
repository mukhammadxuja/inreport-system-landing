function MinimalisticAbout({ userData }) {
  return (
    <header className="mb-6">
      <div className="sticky top-0 z-50 bg-white bg-opacity-50 backdrop-blur w-full mt-8 md:mt-10">
        <h4 className={`minimalistic-template-item-title w-fit duration-500`}>
          About
        </h4>
      </div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mt-3">
        <p className="text-sm text-foreground">{userData?.bio}</p>
      </div>
    </header>
  );
}

export default MinimalisticAbout;
