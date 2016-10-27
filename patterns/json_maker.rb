
# Dir.glob("*.rle").each

list = []

File.open("pulsar.rle", mode = "rt") do |file|
  info = {}

  comments = []   # C c, comments or descriptions for each .rle
  name = ""  # N, name or title of the pattern
  author = [] # O
  offset = "" # P R, top-left corner coordinates
  rule = "" # r

  meta = {} # e.g.: x = 71, y = 65, rule = 23/3
  payload = []

  file.each_line do |line|
    if md = line.match(/^#[Cc] (.*)/)
      comments << md[1]
    elsif md = line.match(/^#N (.*)/)
      name = md[1]
    elsif md = line.match(/^#O (.*)/)
      author << md[1]
    elsif md = line.match(/^#[PR] (.*)/)
      offset = md[1]
    elsif md = line.match(/^#r (.*)/)
      rule = md[1]
    elsif md = line.match(/x\s*=\s*(\d+)\s*,\s*y\s*=\s*(\d+)\s*,\s*rule\s*=\s*(.+)/)
      meta[:x] = md[1]
      meta[:y] = md[2]
      meta[:rule] = md[3]
    elsif md = line.match(/^[0-9bo\$!]+$/)
      payload << md[0]
      p payload
    end
  end

  info[:name] = name
  info[:author] = author
  info[:offset] = offset
  info[:rule] = rule
  info[:comments] = comments.join("\n")

  info[:meta] = meta
  info[:payload] = payload.join("")

  list << info
end
p list
