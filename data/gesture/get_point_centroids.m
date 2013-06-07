%************************************************************
%
%  Create histogram to bin the data
%
%************************************************************

function [centroids K] = get_point_centroids(data,K,D)

mean = zeros(size(data,1),D);
for n = 1:size(data,1)
  for j = 1:D
    mean(n,j) = mean(n,j) + data(n,j);
  end
  mean(n,:) = mean(n,:)./size(data,2);
end
mean
% Using k-means to make data discrete
[centroids,points,idx] = kmeans(mean,K);
K = size(centroids,1);
