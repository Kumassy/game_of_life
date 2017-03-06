require 'json'
require 'uri'

list = []
list_lite = []
# list = {}

Dir.glob("*.rle").each do |filename|
  # p "*" * 20
  # p filename
  File.open(filename, mode = "rt") do |file|
    info = {}

    comments = []   # C c, comments or descriptions for each .rle
    name = ""  # N, name or title of the pattern
    author = "" # O
    offset = "" # P R, top-left corner coordinates
    rule = "" # r
    id = "" # simplified `name`, which is used for HTML id
    url = []

    meta = {} # e.g.: x = 71, y = 65, rule = 23/3
    payload = []

    file.each_line do |line|
      if md = line.match(/^#[Cc] (.*)/)       
        if md[1].match %r(http://(www.)?conwaylife.com/wiki/)
          url << md[1]
        elsif md[1].match %r((www.)?conwaylife.com/wiki/)
          url << "http://#{md[1]}"

        elsif md[1].match %r(http://(www.)?conwaylife.com/forums/)          
          url << md[1]
        elsif md[1].match %r((www.)?conwaylife.com/forums/)          
          url << "http://#{md[1]}"

        elsif md[1].match %r(http://(www.)?conwaylife.com/patterns/)
          url << md[1]
        elsif md[1].match %r((www.)?conwaylife.com/patterns/)
          url << "http://#{md[1]}"

        elsif md[1].match %r(http://home.interserv.com/~mniemiec/)
          url << md[1]
        elsif md[1].match %r(home.interserv.com/~mniemiec/)
          url << "http://#{md[1]}"

        elsif md[1].match %r(www.nathanieljohnston.com/index.php/2009/08/generating-sequences-of-primes-in-conways-game-of-life/)  
          url << "http://#{md[1]}"

 

        elsif URI.extract(md[1]).length > 0
          url << URI.extract(md[1]).first
        else
          comments << md[1]
        end
      elsif md = line.match(/^#N (.*)/)
        name = md[1]
      elsif md = line.match(/^#O (.*)/)
        author = md[1]
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
        # p payload
      end
    end

    id = name.downcase.gsub(/[^\d\w]/, '_')

    info[:name] = name
    info[:author] = author
    info[:offset] = offset
    info[:rule] = rule
    info[:comments] = comments.join("\n")
    info[:id] = id
    info[:url] = url

    info[:meta] = meta
    info[:payload] = payload.join("")

    list << info
    if info[:meta][:x].to_i < 500 && info[:meta][:y].to_i < 500
      list_lite << info
    end

    # list[name] = info
    # p info
  end
end
# p list.to_json

# p list.keys # 1483
# p list.length
# p Dir.glob("*.rle").length
# exit(0)

File.open("../patterns.json","w") do |f|
  f.write(list.to_json)
end
File.open("../patterns-lite.json","w") do |f|
  f.write(list_lite.to_json)
end
