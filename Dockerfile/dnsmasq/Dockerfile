FROM value/supervisor

RUN \
  apt-get update && apt-get install -y dnsmasq \
  && rm -rf /var/lib/apt/lists/* \
  && touch /etc/addn-hosts \
  && touch /etc/resolv.dnsmasq.conf \
  && sed -Ei 's/#resolv-file=/resolv-file=\/etc\/resolv.dnsmasq.conf/' /etc/dnsmasq.conf \
  && echo '[program:dnsmasq]\ncommand=/usr/sbin/dnsmasq --addn-hosts=/etc/addn-hosts --no-daemon'>> /etc/supervisor/conf.d/dnsmasq.conf

# Define working directory.
WORKDIR /root

EXPOSE 22 53
# Define default command.
CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]

