-- CreateTable
CREATE TABLE "StockList" (
    "id" SERIAL NOT NULL,
    "ticker" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "StockList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stock" (
    "id" SERIAL NOT NULL,
    "stock_id" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "low" DOUBLE PRECISION NOT NULL,
    "high" DOUBLE PRECISION NOT NULL,
    "open" DOUBLE PRECISION NOT NULL,
    "close" DOUBLE PRECISION NOT NULL,
    "volume" DOUBLE PRECISION,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StockList_ticker_key" ON "StockList"("ticker");

-- CreateIndex
CREATE INDEX "idx_StockList_ticker" ON "StockList"("ticker");

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_stock_id_fkey" FOREIGN KEY ("stock_id") REFERENCES "StockList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
