import ProductCenter from '@/components/ProductCenter'

export default function Products() {
  return (
    <>
      <div className="relative h-[300px] lg:h-[400px] flex items-center justify-center bg-gradient-to-br from-primary to-primary/80">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        </div>
        <div className="text-center relative z-10 px-4">
          <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full mb-4">
            产品中心
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            全场景数字化解决方案
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            从企业管理到智能硬件，从云端服务到数据分析
          </p>
        </div>
      </div>
      <ProductCenter showTitle={false} />
    </>
  )
}
