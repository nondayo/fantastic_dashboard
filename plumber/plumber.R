# plumber.R
library(magrittr)
library(jsonlite)
load("geojson_data.rda")

#* @filter cors
cors <- function(res) {
  cat("test\n")
  res$setHeader("Access-Control-Allow-Origin", "*")
  plumber::forward()
}

#* Echo an time series
#* @param size string. "week" or "month"
#* @post /data
function(size=""){
  cat("Start plumbing!\n")
  if(runif(1)<0.5){
    return(simpleError("time out"))
  }
  tryCatch({
    size <- switch(
      size,
      "week" = 7,
      "month" = 30,
      stop("Unknown size")
    )
    x <- seq(Sys.Date() - 1, by = -1, length.out = size)
    y <- cumsum(1 + round(rnorm(size), 2))
    list(
      error = 0,
      data = data.frame(x = x, y = y)
    ) %>% 
    toJSON()
  },
  error = function(e) {
    list(
      error = 1,
      msg = conditionMessage(e)
    )
  })
}

#* Echo an geojson
#* @get /mapdata

function(){
  tryCatch({
    return('{"type": "FeatureCollection", "features": [{"geometry": {"type": "Point","coordinates": [-104.9998, 39.7471]},"type": "Feature","properties": {"popupContent": "pop1"},"id": 51}, {"geometry": {"type": "Point","coordinates": [-104.9984, 39.7503]},"type": "Feature","properties": {"popupContent": "pop2"},"id": 52}]}') 
  },
  error = function(e) {
    list(
      error = 1,
      msg = conditionMessage(e)
    )
  })
}
