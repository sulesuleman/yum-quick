export function SplashScreen() {
  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center gap-3 bg-orange-base'>
      <div className='text-4xl font-extrabold tracking-tight text-text-inverse'>
        yum<span className='text-yellow-base'>Quick</span>
      </div>
      <div className='text-sm font-medium tracking-[0.3em] text-text-inverse/80 uppercase'>
        Admin
      </div>
      <div className='mt-4 flex gap-1.5'>
        <span className='h-2 w-2 animate-bounce rounded-full bg-yellow-base [animation-delay:-0.3s]' />
        <span className='h-2 w-2 animate-bounce rounded-full bg-yellow-base [animation-delay:-0.15s]' />
        <span className='h-2 w-2 animate-bounce rounded-full bg-yellow-base' />
      </div>
    </div>
  );
}
