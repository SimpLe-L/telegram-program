import Footer from "@/components/footer"

const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full min-h-dvh">
      {children}
      <Footer />
    </div>
  )
}

export default HomeLayout