# fantastic_dashboard initilization

## Download plumber.R
Install following R packages: plumber, magrittr

## Launch
Under shell, run: 
`Rscript -e "r <- plumber::plumb('plumber.R');r[['run']](port=12345)"`

## Test
Execute `curl -d "size=week" -X POST http://localhost:12345/data` should see:

```
$ curl -d "size=week" -X POST http://localhost:12345/data
{"error":[0],"x":["2019-02-19","2019-02-18","2019-02-17","2019-02-16","2019-02-15","2019-02-14","2019-02-13"],"y":[1.52,3.97,5.61,6.8,9.48,11.26,9.33]}
```
