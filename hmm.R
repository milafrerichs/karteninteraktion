library('RHmm')
data_c = read.csv('pan.csv')
hmm_train <- HMMFit(data_c, nStates=3,control=list(init="KMEANS"))
data_t = data_c[485:529]
data_t = data_c[485:529,]
data_tr = data_c[1:484,]
hmm_train <- HMMFit(data_tr, nStates=3,control=list(init="KMEANS"))
test = forwardBackward(hmm_train,data_t)
