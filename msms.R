data = read.csv('pan_left.csv')
colnames(data) = c("time","x","y","z")
cluster =kmeans(data,3)
data$state = cluster$cluster
qmatrix = rbind( c( 0.5, 0, 0 ), c( 0, 0.5, 0 ), c( 0, 0, 0.5 ) ) 
msm(state ~ time, subject=data,qmatrix)