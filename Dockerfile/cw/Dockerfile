FROM value/java8

ADD jpeg.patch /tmp/jpeg.patch

RUN \
  apt-get update && apt-get install -y wget make g++ patch zlib1g-dev libgif-dev xpdf\
  && cd /tmp \
  && wget http://45.116.61.6/file/swftools-2013-04-09-1007.tar.gz \
  && wget http://45.116.61.6/file/freetype-2.4.0.tar.gz \
  && wget http://45.116.61.6/file/jpegsrc.v9a.tar.gz \
  && tar zxf freetype-2.4.0.tar.gz \
  && tar zxf jpegsrc.v9a.tar.gz \
  && tar zxf swftools-2013-04-09-1007.tar.gz \
  && cd /tmp/jpeg-9a && ./configure && make && make install \
  && cd /tmp/freetype-2.4.0 && ./configure && make && make install \
  && cd /tmp && patch -p0 < /tmp/jpeg.patch && cd swftools-2013-04-09-1007 && ./configure && make && make install \
  && cd /root && rm -R /tmp/* \
  && ranlib /usr/local/lib/libjpeg.a && ldconfig /usr/local/lib \

  && rm -rf /var/lib/apt/lists/* \
  && rm -rf swftools* && rm -rf jpeg* && rm -rf freetype* \

  && apt-get purge -y --auto-remove wget make g++ patch zlib1g-dev libgif-dev 

WORKDIR /root

# Define default command.
CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]

