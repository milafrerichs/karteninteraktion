require 'csv'
require 'pry'

csv_text = File.read('sorted.csv')
csv = CSV.parse(csv_text, :headers => true)
daten = []
datum_before = []
csv.each do |row|
  datum = [row[0],row[1],row[2]]
  if datum_before.count > 0
    unless datum_before[1] > datum[1]
      daten << datum_before if daten.empty?
      daten << datum
    end
  end
  datum_before = datum
end
p daten

CSV.open("pan.csv", "wb") do |csv|
  daten.each do |row|
    csv << row
  end
end
